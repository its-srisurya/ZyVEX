"use client";
import { useUser } from '@clerk/nextjs';
import CoverPhoto from '../components/CoverPhoto';
import { useState, useEffect } from 'react';
import PaymentButton from '../components/PaymentButton';
import { getUserPayments } from '../../actions/userActions';

function UserDashboard() {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch payments when component mounts
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const result = await getUserPayments();
        
        if (result.success) {
          setPayments(result.payments);
        } else {
          setError(result.error || 'Failed to fetch payments');
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Something went wrong while fetching payments');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPayments();
    }
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen border-b border-white">
      <div className="relative">
        <CoverPhoto />
        <div className="absolute -bottom-[62px] right-[612px] flex items-center gap-3 p-3">
          <img
            height={85}
            width={85}
            className="w-[115px] h-[115px] object-fill rounded-xl border-4 border-white"
            src={user.imageUrl}
            alt={`${user.firstName}'s profile`}
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-19 flex-col gap-2">
        <div className="text-3xl">Welcome {`${user.firstName} ${user.lastName}`}</div>
        <div className="text-xl">Email: {user.emailAddresses[0].emailAddress} </div>
        <div className="text-xl">Phone: {user.phoneNumbers?.[0]?.phoneNumber || 'Not provided'}</div>
        <div className="text-xl">Username: {user.username}</div>
        <div className="text-xl"></div>
      </div>


      <div className="payment flex gap-3 w-[80%] mx-auto mb-12">
        <div className="supporters w-1/2 bg-[#AAACB0] text-black rounded-lg p-8">
          <h2 className="text-lg font-bold my-2">Supporters</h2>
          
          {loading ? (
            <div className="text-center py-4">Loading supporters...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : payments.length === 0 ? (
            <div className="text-center py-4">No supporters yet. Share your page to get support!</div>
          ) : (
            <ul className="mx-3">
              {payments.map((payment) => (
                <li key={payment._id} className="my-4 flex gap-2 items-center">
                  <img width={33} src="avatar.gif" alt="user avatar" />
                  <span>
                    {payment.name} supported you with <span className="font-bold">&#8377;{payment.amount}</span> and a message "
                    <span className="font-bold">{payment.message}</span>"
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>


        <div className="make-payment w-1/2 bg-[#353B3C] rounded-lg p-8">
          <h2 className="text-lg font-bold my-2">Make a Payment</h2>
          <div className="flex flex-col gap-2">
            {/* Enter name */}
            <input
              type="text"
              placeholder="Name *"
              className="p-2 rounded-lg my-1 bg-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Amount *"
              className="p-2 rounded-lg my-1 bg-black"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Message *"
              className="p-2 rounded-lg my-1 bg-black"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <PaymentButton 
              amount={amount ? Number(amount) : 0}
              name={name}
              message={message}
            >
              <div className="paybtn p-2 w-full flex items-center justify-center">
                Pay
                <svg className="svgIcon ml-2" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
              </div>
            </PaymentButton>
          </div>
          {/*or choose from the amount below*/}
          <div className="mt-5  text-sm">Or choose from preset amounts (still requires name & message):</div>
          {/* <div className="text-xs text-gray-400 mb-2">* Validation errors will appear above buttons</div> */}
          <div className="flex  gap-2">
            <PaymentButton 
              amount={100} 
              name={name} 
              message={message} 
            />
            <PaymentButton 
              amount={200} 
              name={name} 
              message={message} 
            />
            <PaymentButton 
              amount={500} 
              name={name} 
              message={message} 
            />
          </div>
          <div className="mt-2 text-xs text-gray-400">* All fields are required</div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
