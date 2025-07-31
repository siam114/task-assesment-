import PageLayout from '@/components/layout/PageLayout'
import SpinnerWheel from '@/components/SpinnerWheel'
import React from 'react'

const page = () => {
    return (
        <PageLayout>
            <main className="w-full h-full px-6 pb-20 py-10">
                <div className="bg-white shadow-2xl h-full rounded-4xl p-15 mx-auto">
                    <SpinnerWheel />
                </div>
            </main>
        </PageLayout>
    )
}

export default page
