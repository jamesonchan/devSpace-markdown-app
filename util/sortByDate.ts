export const sortByDate = (a: any, b: any) =>
  (new Date(b.frontmatter.date) as any) - (new Date(a.frontmatter.date) as any);
