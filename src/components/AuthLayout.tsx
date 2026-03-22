import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">TDRFATAX</h1>
          <p className="text-center text-gray-500 mb-8">Tax Filing Application</p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
          
          {children}
        </div>

        <div className="text-center text-white mt-6 text-sm">
          <p>© 2026 TDRFATAX. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
