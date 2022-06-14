import {FaTrash} from 'react-icons/fa';
import {useMutation} from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function ClientRow({client}) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
  variables : {id: client.id},
  //refetchQueries: [{query: GET_CLIENTS}], //refetch the clients query after deleting a client instead of refreshing the page
  update(cache , {data: { deleteClient } }) { 
    const { clients } = cache.readQuery({ query: GET_CLIENTS });
    cache.writeQuery({
      query: GET_CLIENTS,
      data: { clients: clients.filter(client => client.id !== deleteClient.id) } //filter the clients array to remove the deleted client
    })
  }
});
  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
            <button className="btn btn-danger btn-sm"
            onClick={deleteClient}>
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}
