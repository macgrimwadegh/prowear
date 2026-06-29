import ShopHeader from '../components/shop-header'

export default function SwimwearPage() {
  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-xs tracking-widest uppercase text-gray-400">Swim Wear — Coming Soon</p>
        </div>
      </main>
    </div>
  )
}
