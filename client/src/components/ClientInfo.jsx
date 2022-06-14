import { FaIdBadge, FaPhone, FaEnvelope } from "react-icons/fa"

export default function ClientInfo( client ) {
  return (
    <>
    <h1 className="mt-3">Client Informationatics</h1>
    <ul className="list-group">
        <li className="list-group-item">
        <FaIdBadge className="icons"/> {client.name}
        </li>
        <li className="list-group-item"> {client.email}
        <FaEnvelope className="icons"/>
        </li>        <li className="list-group-item">
        <FaPhone className="icons"/>  {client.phone}
        </li>
    </ul>
    </>
  )
}
