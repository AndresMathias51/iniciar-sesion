import "@/components/header.css";

type Props = {
email:string
}

const AccountHeader = ({email}:Props) => {

return(

<div className="account-header">

<span className="account-email">{email}</span>

<button className="close-btn">✕</button>

</div>

)

}

export default AccountHeader;