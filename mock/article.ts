import { Request, Response } from 'express';

const getArticles = (req: Request, res: Response, u: string) => {
  var arr: Array<API.Article> = [];
  for (let index = 1; index < 100; index++) {
    arr.push({
      id: index,
      title:
        '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
      publishAt: new Date(),
      images: [
        'http://localhost/images/79444%E3%80%8A%E7%9B%B2%E7%9B%92%E7%AC%AC%E5%85%AB%E5%AD%A3%E3%80%8B%E5%A4%A7%E5%AE%B6%E6%9C%9F%E5%BE%85%E7%9A%84%E7%AC%AC%E4%B8%83%E6%9C%9F%E7%9B%B2%E7%9B%92%E6%96%B0%E9%B2%9C%E5%87%BA%E7%82%89%E5%92%AF%EF%BC%81%E9%BB%91%E4%B8%9D%E7%A9%BA%E5%A7%90%E6%A8%A1%E7%89%B9%E5%B8%A6%E7%9D%80%E6%B2%89%E9%87%8D%E7%9A%84%E6%89%8B%E8%84%9A%E9%93%BE%E6%8A%BC...-%E5%A6%82%E6%A2%A6%20-%20siwakb/1.jpg',
        'http://localhost/images/79444%E3%80%8A%E7%9B%B2%E7%9B%92%E7%AC%AC%E5%85%AB%E5%AD%A3%E3%80%8B%E5%A4%A7%E5%AE%B6%E6%9C%9F%E5%BE%85%E7%9A%84%E7%AC%AC%E4%B8%83%E6%9C%9F%E7%9B%B2%E7%9B%92%E6%96%B0%E9%B2%9C%E5%87%BA%E7%82%89%E5%92%AF%EF%BC%81%E9%BB%91%E4%B8%9D%E7%A9%BA%E5%A7%90%E6%A8%A1%E7%89%B9%E5%B8%A6%E7%9D%80%E6%B2%89%E9%87%8D%E7%9A%84%E6%89%8B%E8%84%9A%E9%93%BE%E6%8A%BC...-%E5%A6%82%E6%A2%A6%20-%20siwakb/1.jpg',
      ],
      category: '分类',
      cover:
        'http://localhost/images/79444%E3%80%8A%E7%9B%B2%E7%9B%92%E7%AC%AC%E5%85%AB%E5%AD%A3%E3%80%8B%E5%A4%A7%E5%AE%B6%E6%9C%9F%E5%BE%85%E7%9A%84%E7%AC%AC%E4%B8%83%E6%9C%9F%E7%9B%B2%E7%9B%92%E6%96%B0%E9%B2%9C%E5%87%BA%E7%82%89%E5%92%AF%EF%BC%81%E9%BB%91%E4%B8%9D%E7%A9%BA%E5%A7%90%E6%A8%A1%E7%89%B9%E5%B8%A6%E7%9D%80%E6%B2%89%E9%87%8D%E7%9A%84%E6%89%8B%E8%84%9A%E9%93%BE%E6%8A%BC...-%E5%A6%82%E6%A2%A6%20-%20siwakb/1.jpg',
    });
  }
  res.json(arr);
  return;
};

const deleteArticle = (req: Request, res: Response, u: string) => {
  res.json(204);

  res.end();
};

// export default {
//   'GET /api/articles': getArticles,
//   'DELETE /api/articles/:id': deleteArticle,
// };
