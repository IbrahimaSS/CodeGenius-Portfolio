import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOMAIN = "https://soumah.dev";
const HASHNODE_USERNAME = process.env.VITE_HASHNODE_USERNAME || "codegenius76";

async function fetchHashnodeSlugs() {
  try {
    const query = `
      query {
        user(username: "${HASHNODE_USERNAME}") {
          publications(first: 1) {
            edges {
              node {
                posts(first: 50) {
                  edges {
                    node {
                      slug
                      updatedAt
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    const posts = data?.data?.user?.publications?.edges?.[0]?.node?.posts?.edges || [];
    return posts.map((p) => ({
      slug: p.node.slug,
      lastmod: p.node.updatedAt?.split("T")[0] || new Date().toISOString().split("T")[0],
    }));
  } catch (err) {
    console.warn("⚠️  Impossible de récupérer les articles Hashnode:", err.message);
    console.log("   → Génération du sitemap avec les pages statiques uniquement.");
    return [];
  }
}

async function generateSitemap() {
  console.log("🗺️  Génération du sitemap...");

  const today = new Date().toISOString().split("T")[0];
  const hashnodeSlugs = await fetchHashnodeSlugs();

  // Pages statiques
  const staticPages = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
  ];

  // Pages articles dynamiques (Hashnode)
  const articlePages = hashnodeSlugs.map((post) => ({
    loc: `/blog/${post.slug}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: post.lastmod,
  }));

  // Fallback : articles locaux si pas de Hashnode
  let localArticlePages = [];
  if (hashnodeSlugs.length === 0) {
    try {
      // Read articles.js and extract slugs via regex (ESM compat)
      const articlesPath = path.resolve(__dirname, "../src/data/articles.js");
      const content = fs.readFileSync(articlesPath, "utf-8");
      const slugMatches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
      localArticlePages = slugMatches.map((m) => ({
        loc: `/blog/${m[1]}`,
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
      }));
      console.log(`   → ${localArticlePages.length} articles locaux trouvés.`);
    } catch {
      console.log("   → Aucun article local trouvé.");
    }
  }

  const allPages = [...staticPages, ...articlePages, ...localArticlePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${DOMAIN}${page.loc}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const robots = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

  const publicDir = path.resolve(__dirname, "../public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);

  console.log(`✅ sitemap.xml généré (${allPages.length} URLs)`);
  console.log("✅ robots.txt généré");
}

generateSitemap();
