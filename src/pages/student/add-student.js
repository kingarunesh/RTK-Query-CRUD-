import { useState, useEffect } from "react";
import { Input, Row, Col, Button, Card, message } from "antd";
import { useAddStudentMutation } from "../../services/students";

const key = "add_student";

const AddStudent = ({ history }) => {
    const [data, setData] = useState({
        fullName: "",
        phone: "",
        email: "",
    });

    const [addStudent, { isLoading, isSuccess }] = useAddStudentMutation();

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    useEffect(() => {
        if (isLoading) {
            message.loading({ content: "creating new student...", key });
        }

        if (isSuccess) {
            message.success({ content: "New Student Created.", key, duration: 3 });
        }
    }, [isLoading, isSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addStudent(data);

        console.log(data);

        // after submit data
        setData({
            fullName: "",
            phone: "",
            email: "",
        });

        history.push("/");
    };
    return (
        <form onSubmit={handleSubmit}>
            <Card title="Create a new student">
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        <Input
                            size="large"
                            placeholder="Enter Student Full Name"
                            name="fullName"
                            value={data.fullName}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </Col>
                    <Col span={24}>
                        <Input
                            size="large"
                            placeholder="Enter Student Phone Number"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </Col>
                    <Col span={24}>
                        <Input
                            size="large"
                            placeholder="Enter Student E-mail address"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </Col>
                    <Col span={24}>
                        <Button htmlType="submit" type="primary" disabled={isLoading}>
                            Add Student
                        </Button>
                    </Col>
                </Row>
            </Card>
        </form>
    );
};

export default AddStudent;
