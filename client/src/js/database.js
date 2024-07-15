import { openDB } from 'idb';

const initdb = async () =>
  openDB('notes', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('notes')) {
        console.log('notes database already exists');
        return;
      }
      db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
      console.log('notes database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('notes', 1);
  const transaction = db.transaction('notes', 'readwrite');
  const store = transaction.objectStore('notes');
  await store.add(content);
  await transaction.complete;
  console.log('Content added to the database');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('notes', 1);
  const transaction = db.transaction('notes', 'readonly');
  const store = transaction.objectStore('notes');
  const content = await store.getAll();
  return content;
};

initdb();
