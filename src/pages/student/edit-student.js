import { useState, useEffect } from "react";
import { Input, Row, Col, Button, Card, message } from "antd";
import { useGetStudentsQuery, useUpdateStudentMutation } from "../../services/students";

const key = "update_student";

const EditStudent = ({ history, match }) => {
    const { data: studentData } = useGetStudentsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data: data?.find((el) => el.id == match.params.id),
        }),
    });

    const [updateStudent, { isLoading, isSuccess }] = useUpdateStudentMutation();

    const [data, setData] = useState({
        fullName: "",
        phone: "",
        email: "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    useEffect(() => {
        if (studentData) {
            setData(studentData);
        }
    }, [studentData]);

    useEffect(() => {
        if (isLoading) {
            message.loading({ content: "Updating student...", key });
        }

        if (isSuccess) {
            message.success({ content: "Updated student successfully.", key, duration: 3 });
        }
    }, [isLoading, isSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);

        await updateStudent(data);

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
            <Card title="Edit a new student">
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        <Input
                            size="large"
                            placeholder="Enter Student Full Name"
                            name="fullName"
                            value={data.fullName}
                            onChange={handleChange}
                            disabled={isLoading || !data.fullName}
                        />
                    </Col>
                    <Col span={24}>
                        <Input
                            size="large"
                            placeholder="Enter Student Phone Number"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            disabled={isLoading || !data.phone}
                        />
                    </Col>
                    <Col span={24}>
                        <Input
                            size="large"
                            placeholder="Enter Student E-mail address"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            disabled={isLoading || !data.email}
                        />
                    </Col>
                    <Col span={24}>
                        <Button
                            htmlType="submit"
                            disabled={isLoading || Object.values(data).every((el) => el == "")}
                            type="primary"
                        >
                            Update Student
                        </Button>
                    </Col>
                </Row>
            </Card>
        </form>
    );
};

export default EditStudent;
