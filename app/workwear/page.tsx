import ShopHeader from '../components/shop-header'
import CategoryFilter from '../components/category-filter'
import {
  getCollectionProducts,
  getSafetyProducts,
  excludeKidsProducts,
  excludeProductsWithoutImages,
} from '../../lib/shopify-storefront'

const FETCH_TAGS = ['Workwear', 'Aprons & Overalls']
const TABS = ['Tops', 'Jackets', 'Shirts', 'Aprons & Overalls', "Women's"]

// Title-based classifiers for the Workwear tag split
const JACKET_RE = /jacket|fleece|zip|hoodie/i
const SHIRT_RE = /\bshirt\b/i
const TEE_RE = /tee|t-shirt/i

export default async function WorkwearPage() {
  const [regular, safety] = await Promise.all([
    getCollectionProducts(FETCH_TAGS),
    getSafetyProducts(),
  ])

  const seen = new Set<string>()
  const merged = [...regular, ...safety].filter((p) => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })

  const products = excludeProductsWithoutImages(excludeKidsProducts(merged))

  // Aprons & Overalls products are strictly isolated — excluded from all other tabs
  const isApron = (p: (typeof products)[0]) =>
    p.tags.some((t) => t.toLowerCase() === 'aprons & overalls')

  const workItems = products.filter((p) => !isApron(p))

  const tabGroups = {
    // Tops: anything that isn't a jacket and isn't a shirt (t-shirts/tees stay here)
    'Tops': workItems.filter(
      (p) => !JACKET_RE.test(p.title) && (!SHIRT_RE.test(p.title) || TEE_RE.test(p.title))
    ),
    // Jackets: jacket, fleece, any zip style, hoodie
    'Jackets': workItems.filter((p) => JACKET_RE.test(p.title)),
    // Shirts: "shirt" in title, excluding t-shirts and tees
    'Shirts': workItems.filter(
      (p) => SHIRT_RE.test(p.title) && !TEE_RE.test(p.title)
    ),
    'Aprons & Overalls': products.filter((p) => isApron(p)),
    "Women's": products.filter((p) => p.title.includes("Wo's")),
  }

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-xs tracking-widest uppercase mb-6 text-gray-400">Work Wear</h1>
        <CategoryFilter all={products} tabGroups={tabGroups} tabs={TABS} />
      </main>
    </div>
  )
}
