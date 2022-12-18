import { Row, Spin } from "antd";
import { useGetStudentsQuery } from "../../services/students";
import StudentItem from "./StudentItem";

const Students = () => {
    const { data, isFetching } = useGetStudentsQuery();

    return (
        <>
            {isFetching ? (
                <div className="spinner-wrapper">
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={[20, 20]}>
                    {data.map((student) => (
                        <StudentItem key={student.id} student={student} />
                    ))}
                </Row>
            )}
        </>
    );
};

export default Students;
