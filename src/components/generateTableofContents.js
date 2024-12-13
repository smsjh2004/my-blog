import { remark } from 'remark';

export async function generateTableOfContents(markdownContent) {
  const headings = [];

  // Markdown을 파싱하여 헤더 추출
  await remark()
    .use(() => (tree) => {
      tree.children.forEach((node) => {
        if (node.type === 'heading') {
          headings.push({
            number: headings.length + 1, // 1부터 순서대로 번호 부여
            text: node.children[0]?.value || '', // 헤더 텍스트
          });
        }
      });
    })
    .process(markdownContent);

  return headings;
}
