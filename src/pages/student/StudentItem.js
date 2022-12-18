import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDeleteStudentMutation } from "../../services/students";

const { Title, Paragraph } = Typography;

const key = "delete_student";

const StudentItem = ({ student }) => {
    const { id, fullName, phone, email } = student;

    const [deleteStudent, { isLoading, isSuccess }] = useDeleteStudentMutation();

    const history = useHistory();

    useEffect(() => {
        if (isLoading) {
            message.loading({ content: "deleting student...", key });
        }

        if (isSuccess) {
            message.success({ content: "deleted student.", key, duration: 3 });
        }
    }, [isLoading, isSuccess]);

    return (
        <>
            <Col span={6}>
                <Card
                    hoverable={true}
                    bordered={false}
                    cover={<img alt="example" src={`https://i.pravatar.cc/1920?img=${id}`} />}
                    actions={[
                        <EyeOutlined key="view" onClick={() => history.push(`/students/${id}`)} />,
                        <EditOutlined key="edit" onClick={() => history.push(`/students/edit/${id}`)} />,
                        <DeleteOutlined key="setting" onClick={() => deleteStudent(id)} />,
                    ]}
                >
                    <div className="student-info">
                        <Title level={5}>{fullName}</Title>
                        <Paragraph>{email}</Paragraph>
                        <Paragraph>{phone}</Paragraph>
                    </div>
                </Card>
            </Col>
        </>
    );
};

export default StudentItem;
