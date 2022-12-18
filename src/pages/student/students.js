import { Row, Col, Card, Typography, Spin } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useGetStudentsQuery } from "../../services/students";

const { Title, Paragraph } = Typography;

const Students = () => {
    const { data, isFetching } = useGetStudentsQuery();

    let history = useHistory();
    return (
        <>
            {isFetching ? (
                <div className="spinner-wrapper">
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={[20, 20]}>
                    {data.map(({ id, fullName, phone, email }) => (
                        <Col span={6} key={id}>
                            <Card
                                hoverable={true}
                                bordered={false}
                                cover={<img alt="example" src={`https://i.pravatar.cc/1920?img=${id}`} />}
                                actions={[
                                    <EyeOutlined key="view" onClick={() => history.push("/students/100")} />,
                                    <EditOutlined key="edit" onClick={() => history.push("/students/edit/100")} />,
                                    <DeleteOutlined key="setting" onClick={() => alert("delete item!")} />,
                                ]}
                            >
                                <div className="student-info">
                                    <Title level={5}>{fullName}</Title>
                                    <Paragraph>{email}</Paragraph>
                                    <Paragraph>{phone}</Paragraph>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default Students;
