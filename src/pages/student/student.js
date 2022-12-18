import React from "react";
import { Row, Col, Card, Image, Descriptions, Spin } from "antd";
import { useGetStudentByIdQuery, useGetStudentsQuery } from "../../services/students";

const Student = ({ match }) => {
    // const { data, isFetching } = useGetStudentByIdQuery(match.params.id);

    const { data } = useGetStudentsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data: data?.find((el) => el.id == match.params.id),
        }),
    });

    return (
        <>
            {/* {isFetching ? ( */}
            {data == undefined ? (
                <div className="spinner-wrapper">
                    <Spin size="large" />
                </div>
            ) : (
                <Card title="View Student Detials">
                    <Row gutter={[0, 20]}>
                        <Col span={8}>
                            <Image width={200} src={`https://i.pravatar.cc/300?img=${data.id}`} />
                        </Col>
                        <Col span={16}>
                            <Descriptions title="Subroto Biswas " layout="vertical">
                                <Descriptions.Item label="Full Name">{data.fullName}</Descriptions.Item>
                                <Descriptions.Item label="Phone Number">{data.phone}</Descriptions.Item>
                                <Descriptions.Item label="E-mail Address">{data.email}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
            )}
        </>
    );
};

export default Student;
