import Products from '@/components/Product'
import Link from 'next/link'
import React from 'react'

function NewProduct() {
  return <>
    <header>
      <div className="mx-auto max-w-screen-6xl py-6 sm:py-12">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">Yeni Ürün Ekle</h1>
          </div>
        </div>
      </div>
    </header>

    <hr className="my-1 h-px border-0 bg-gray-300" />

    <div className="mx-auto max-w-screen-6xl py-6 sm:py-12">
      <Products/>
    </div>
  </>
}

export default NewProduct
