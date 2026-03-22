import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    taxId: 'AABCD1234A',
    organization: 'ABC Corporation',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Profile Picture" className="lg:col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl mb-4">
                JD
              </div>
              <p className="text-gray-600 font-medium">John Doe</p>
              <Button variant="secondary" size="sm" className="mt-4">
                Change Picture
              </Button>
            </div>
          </Card>

          <Card title="Personal Information" className="lg:col-span-2">
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </Card>
        </div>

        <Card title="Tax Information" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Tax ID"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </Card>

        <div className="mt-6 flex gap-4">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : (
            <>
              <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          )}
          <Button variant="danger">Logout</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
