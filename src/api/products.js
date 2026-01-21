export async function fetchProducts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=20");
  if (!res.ok) throw new Error("Ürünler alınamadı");
  const data = await res.json();

  return data.map((p) => ({
    id: String(p.id),
    title: p.title,
    description: p.body,
    price: (p.id * 3.75).toFixed(2),
  }));
}
