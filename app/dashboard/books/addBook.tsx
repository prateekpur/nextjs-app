/* eslint-disable no-undef */
'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { addBook, fetchBooks } from '../../features/bookSlice';
import { useAppDispatch } from '../../hooks';

export default function AddBook({ onChange }: { onChange: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const book = { id: uuidv4(), name, description };
      dispatch(addBook(book))
        .unwrap()
        .then(() => {
           
          console.log('fetching all books');
          dispatch(fetchBooks());
        });
      onChange();
      setName('');
      setDescription('');
    } catch (error) {
       
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={name}
          style={{ width: '300px', height: '40px' }}
          className="w-full p-2 border rounded"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          style={{ width: '300px', height: '40px' }}
          value={description}
          className="w-full p-2 border rounded"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Book
      </button>
    </form>
  );
}
