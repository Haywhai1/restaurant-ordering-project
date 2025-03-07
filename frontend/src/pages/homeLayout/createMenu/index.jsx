import React from 'react'
import { useGetCurrentUser } from '../../../shared/hooks/useGetCurrentUser';
import MenuForm from './components/MenuForm';

const CreateMenu = () => {
  const { isLoading, user } = useGetCurrentUser();

  if (isLoading) {
    return (
      <div className="flex items-center text-black justify-center min-h-screen font-bold text-xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center text-blue-500 justify-center min-h-screen font-bold text-xl">
        Please login to post a menu.
      </div>
    );
  }
  if (user.role!== 'admin') {
    return (
      <div className="flex items-center text-blue-500 justify-center min-h-screen font-bold text-xl">
        You are not authorized to create a menu!!!
      </div>
    );
  }

  return (
    <div>
      <MenuForm/> {" "}
    </div>
  )
}

export default CreateMenu