import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import { DELETE_PROJECT } from "../mutations/projectMutations"

export default function DeleteProjectButton({projectId}) {
    const navigate = useNavigate() //this is to redirect to the home page after deleting a project

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate("/"),
        refetchQueries: [{ query: GET_PROJECTS }]
})
  return (
    <div className="d-flex mt-5 ms-auto">
    <button className="btn btn-danger m-3"
        onClick={deleteProject}>
        <FaTrash className="icon" /> Delete this Project
    </button>
    </div>
  )
}
