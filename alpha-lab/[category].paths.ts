import categories from "./categories.json";

// Helper function to convert to kebab-case
const toKebabCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// Generate paths for all categories
export default {
  paths() {
    return categories.map(
      (category: { id: string; title: string; description: string }) => ({
        params: {
          category: toKebabCase(category.id),
        },
      })
    );
  },
};
