"use client";
import { useUser } from '@clerk/nextjs';
import CoverPhoto from '../components/CoverPhoto';
import { useState, useEffect } from 'react';
import PaymentButton from '../components/PaymentButton';
import { getUserPayments } from '../../actions/userActions';
import { toast } from 'react-toastify';
import Image from 'next/image';

function UserDashboard() {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalStats, setTotalStats] = useState({ count: 0, amount: 0 });

  // Fetch payments when component mounts
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const result = await getUserPayments();
        
        if (result.success) {
          setPayments(result.payments);
          setTotalStats({
            count: result.totalCount,
            amount: result.totalAmount
          });
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

  // Check for payment success notification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const paymentSuccess = localStorage.getItem('paymentSuccess');
      if (paymentSuccess === 'true') {
        // Show thank you toast
        toast('Thanks for supporting', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        
        // Clear the flag
        localStorage.removeItem('paymentSuccess');
      }
    }
  }, []);

  if (!user) return (
    <div className="h-screen flex justify-center items-center">
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle r="32" cy="40" cx="40" id="test"></circle>
        </svg>
      </div>

      <div className="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>

      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect height="64" width="64" y="8" x="8"></rect>
        </svg>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen border-b border-white">
      <div className="relative">
        <CoverPhoto />
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 flex items-center justify-center">
          {user && user.imageUrl ? (
            <Image
              className="w-32 h-32 object-cover rounded-xl border-4 border-white shadow-lg"
              src={user.imageUrl}
              alt={`${user.firstName}'s profile`}
              width={128}
              height={128}
              unoptimized={true}
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-xl border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-gray-600 text-4xl">{user && user.firstName ? user.firstName[0] : '?'}</span>
            </div>
          )}
        </div>
      </div>
      <div className="info flex justify-center items-center mt-20 flex-col gap-2 px-4">
        <div className="text-3xl text-center">Welcome {`${user.firstName} ${user.lastName}`}</div>
        <div className="text-xl text-center">Email: {user.emailAddresses[0].emailAddress} </div>
        <div className="text-xl text-center">Phone: {user.phoneNumbers?.[0]?.phoneNumber || 'Not provided'}</div>
        <div className="text-xl text-center">Username: {user.username}</div>
        
        {/* Stats section */}
        <div className="stats flex flex-wrap justify-center gap-4 md:gap-6 mt-4 mb-4">
          <div className="stat bg-gray-800 rounded-lg px-6 py-3 text-center">
            <div className="text-green-400 text-2xl font-bold">
              {totalStats.count}
            </div>
            <div className="text-gray-300">Payments Received</div>
          </div>
          
          <div className="stat bg-gray-800 rounded-lg px-6 py-3 text-center">
            <div className="text-green-400 text-2xl font-bold">
              ₹{totalStats.amount}
            </div>
            <div className="text-gray-300">Total Funds Raised</div>
          </div>
        </div>
      </div>


      <div className="payment flex flex-col md:flex-row gap-4 md:gap-3 w-[95%] md:w-[90%] lg:w-[80%] mx-auto mb-12 px-2">
        <div className="supporters w-full md:w-1/2 bg-[#AAACB0] text-black rounded-lg p-4 md:p-8">
          <h2 className="text-lg font-bold my-2">Recent Supporters</h2>
          
          {loading ? (
            <div className="text-center py-4">Loading supporters...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : payments.length === 0 ? (
            <div className="text-center py-4">No supporters yet. Share your page to get support!</div>
          ) : (
            <ul className="mx-3">
              {payments.map((payment, index) => (
                <li key={payment?._id || index} className="my-4 flex gap-2 items-center">
                  <Image 
                    width={33} 
                    height={33} 
                    src="/avatar.gif" 
                    alt="user avatar" 
                    unoptimized={true}
                  />
                  <span className="text-sm md:text-base">
                    {payment?.name || 'Anonymous'} supported you with <span className="font-bold">&#8377;{payment?.amount || 0}</span> and a message &quot;
                    <span className="font-bold">{payment?.message || 'No message'}</span>&quot;
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>


        <div className="make-payment w-full md:w-1/2 bg-[#353B3C] rounded-lg p-4 md:p-8">
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
          <div className="mt-5 text-sm">Or choose from preset amounts (still requires name & message):</div>
          {/* <div className="text-xs text-gray-400 mb-2">* Validation errors will appear above buttons</div> */}
          <div className="flex flex-wrap gap-2">
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
