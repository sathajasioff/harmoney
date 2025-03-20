
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BranchDetails = () => {
  const { location } = useParams();
  
  const branchInfo = {
    'jaffna': {
      name: 'Jaffna',
      address: '123 Finance Street, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'newyork@harmonyinvestment.com',
      hours: 'Monday - Friday: 9AM - 5PM'
    },
    'vavuniya': {
      name: 'Vavuniya',
      address: '456 Finance Street, London, EC2V 6DN',
      phone: '+44 20 7123 4567',
      email: 'london@harmonyinvestment.com',
      hours: 'Monday - Friday: 9AM - 5PM'
    },
    'trinco': {
      name: 'Trinco',
      address: '789 Finance Street, Chiyoda-ku, Tokyo 100-0001',
      phone: '+81 3 1234 5678',
      email: 'tokyo@harmonyinvestment.com',
      hours: 'Monday - Friday: 9AM - 5PM'
    }
  };
  
  const branch = location ? branchInfo[location as keyof typeof branchInfo] : null;
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="container-custom">
          {branch ? (
            <div>
              <h1 className="text-4xl font-display font-semibold text-center">{branch.name} Branch</h1>
              <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
                <p><strong>Address:</strong> {branch.address}</p>
                <p><strong>Phone:</strong> {branch.phone}</p>
                <p><strong>Email:</strong> {branch.email}</p>
                <p><strong>Hours:</strong> {branch.hours}</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-display font-semibold">Branch Not Found</h1>
              <p className="text-gray-600 mt-4">The branch you're looking for doesn't exist.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BranchDetails;
