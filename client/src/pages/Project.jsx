import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";

export default function Project() {
    const { id } = useParams();
    const {loading, error, data} = useQuery(GET_PROJECT, 
        {variables: {id}});

        if (loading) return <Spinner />;
        if (error) return <p>error something went wrong...</p>;
        
  return (
    <>
    {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
            <Link to="/" className="btn btn-primary btn-sm w-25 d-inline ms-auto">
            U-turn Go Back
            </Link>
            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>

            <h2 className="mt-3">Project Status</h2>
            <p className="lead">Status: {data.project.status}</p>
            
            <ClientInfo client={data.project.client} />

            <DeleteProjectButton projectId={data.project.id} />
        </div>
    )}
    </>
  )
}
