import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react'
import Spinner from './Spinner';

import { ReactSortable } from 'react-sortablejs';

function Products() {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const [isUploading, setIsUploading] = useState(false);

  const uploadImagesQueue = [];

  async function createProduct(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = { title, description, price, images };

    await axios.post('/api/products', data);

    setRedirect(true);
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const data = new FormData();
        data.append('file', file);

        uploadImagesQueue.push(
          axios.post('/api/upload', data).then(res => {
            setImages(oldImages => [...oldImages, ...res.data.links]);
          })
        )
      }

      await Promise.all(uploadImagesQueue);
      setIsUploading(false);
    } else {
      return ('Bir hata oluştu');
    }
  }

  if (redirect) {
    router.push('/products');
    return null;
  }

  function updateImagesOrder(Images) {
    setImages(Images);
  }

  function handleDeleteImage(index) {
    const updateImages = [...images];
    updateImages.splice(index, 1);
    setImages(updateImages);
  }

  return (
    <>
      <form onSubmit={createProduct} className="mx-auto max-w-screen-lg">

        <div className="mx-auto my-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-lg font-medium text-gray-700">Başlık</label>
            <input type="text" id="title" className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3" placeholder="Ürün Başlığı" value={title} onChange={ev => setTitle(ev.target.value)} />
          </div>
        </div>

        <div className="mx-auto my-4">
          <div>
            <label htmlFor="categories" className="mb-1 block text-lg font-medium text-gray-700">Kategoriler</label>
            <select id="example1" className="block w-full rounded-md border border-gray-300 text-gray-400 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3" defaultValue={'DEFAULT'}>
              <option value={'DEFAULT'} disabled>Kategori Seçiniz</option>
              <option value="">Option02</option>
              <option value="">Option03</option>
            </select>
          </div>
        </div>

        <div className="mx-auto my-4">
          <div className="">
            <label htmlFor="images" className="mb-1 block text-lg font-medium text-gray-700">Resimler</label>
            <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
              <div className="space-y-1 text-center">
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                </div>
                <div className="text-gray-600"><a href="#" className="font-medium text-primary-500 hover:text-primary-700">Yüklemek için tıklayın</a> veya sürükleyip bırakın</div>
                <p className="text-sm text-gray-500">SVG, PNG, JPG veya GIF (max. 800x400px)</p>
              </div>
              <input id="fileInput" className="sr-only" type="file" accept="image/*" multiple onChange={uploadImages} />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center rounded">
          {isUploading && (
            <Spinner className="p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>

        {!isUploading && (
          <div className="grid grid-cols-2 gap-4">
            <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className="grid grid-cols-3 gap-4">
              {Array.isArray(images) && images.map((link, index) => (
                <div key={link} className="relative group">
                  <img src={link} className="object-cover h-32 w-44 rounded-md p-2" />
                  <div className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDeleteImage(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        <div className="mx-auto my-4">
          <div>
            <label htmlFor="description" className="mb-1 block text-lg font-medium text-gray-700">Açıklama</label>
            <textarea rows={5} id="description" className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3" placeholder="Ürün Açıklaması" value={description} onChange={ev => setDescription(ev.target.value)} />
          </div>
        </div>

        <div className="mx-auto my-4">
          <div>
            <label htmlFor="price" className="mb-1 block text-lg font-medium text-gray-700">Ürün Fiyatı</label>
            <input type="number" id="price" className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3" placeholder="Ürün Fiyatı" value={price} onChange={ev => setPrice(ev.target.value)} />
          </div>
        </div>

        <div className="mx-auto my-4">
          <button
            className="inline-block w-full text-center rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
            type="submit"
          >
            Kaydet
          </button>
        </div>

      </form>
    </>
  )
}

export default Products
