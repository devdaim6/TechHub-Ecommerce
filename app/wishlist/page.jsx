"use client";
import React, { useState } from "react";

const Wishlist = () => {
  const removeFromWishlist = (itemId) => {};
  // /api/user/65a42f9bf5caa07b3821e6b2?field=wishlist
  return (
    <></>
    // <div className="max-w-2xl mx-auto mt-8">
    //   <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
    //   {wishlistItems.length === 0 ? (
    //     <p className="text-gray-500">Your wishlist is empty.</p>
    //   ) : (
    //     <ul className="grid grid-cols-1 gap-4">
    //       {wishlistItems.map((item) => (
    //         <li key={item.id} className="bg-white p-4 rounded-md shadow-md">
    //           <div className="flex justify-between items-center">
    //             <div className="flex items-center space-x-4">
    //               <img
    //                 src={item.image}
    //                 alt={item.name}
    //                 className="w-16 h-16 rounded-md object-cover"
    //               />
    //               <div>
    //                 <h3 className="text-lg font-semibold">{item.name}</h3>
    //                 <p className="text-gray-500">{item.price}</p>
    //                 {/* Additional details */}
    //                 <p className="text-sm text-gray-600">{item.details}</p>
    //               </div>
    //             </div>
    //             <button
    //               onClick={() => removeFromWishlist(item.id)}
    //               className="text-red-500 hover:text-red-700 cursor-pointer"
    //             >
    //               Remove
    //             </button>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
};

export default Wishlist;
