import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define the interface for branch data
interface Branch {
  id: number;
  district: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

const BranchDetails = () => {
  const { location } = useParams<{ location: string }>(); // Get the district from the URL params
  const [branch, setBranch] = useState<Branch | null>(null); // Strongly type the branch state

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await fetch('http://localhost:3001/branches');
        const data = await response.json();
        
        // Find the branch based on the district in the URL
        const selectedBranch = data.find((branch: Branch) => branch.district.toLowerCase() === location);
        setBranch(selectedBranch || null); // Set the selected branch or null if not found
      } catch (error) {
        console.error('Error fetching branch details:', error);
      }
    };

    fetchBranch(); // Fetch branch data when the component mounts or location changes
  }, [location]); // Re-run the effect if the location changes

  if (!branch) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-display font-semibold">Branch Not Found</h1>
            <p className="text-gray-600 mt-4">The branch you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-semibold text-center">{branch.district} Branch</h1>
          <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <p><strong>Address:</strong> {branch.address}</p>
            <p><strong>Phone:</strong> {branch.phone}</p>
            <p><strong>Email:</strong> {branch.email}</p>
            <p><strong>Hours:</strong> {branch.hours}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BranchDetails;
