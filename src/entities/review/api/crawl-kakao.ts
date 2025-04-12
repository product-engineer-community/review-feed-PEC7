import { chromium } from "playwright";
import { KakaoReview } from "../model/types";

export async function fetchKakaoReviews(id: string): Promise<KakaoReview[]> {
  const url = `https://place.map.kakao.com/${id}`;

  let browser;

  try {
    browser = await chromium.launch({ headless: true });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
      viewport: { width: 390, height: 844 },
    });

    const page = await context.newPage();

    await page.goto(url, { waitUntil: "networkidle" });

    // 리뷰 리스트 로딩 대기
    await page.waitForSelector(".list_review > li", { timeout: 30000 });

    // 리뷰 데이터 추출
    const reviews: KakaoReview[] = await page.$$eval(
      ".list_review > li",
      (nodes) =>
        nodes.map((node) => {
          const getText = (sel: string) =>
            node.querySelector(sel)?.textContent?.trim() || "";
          const getImg = (sel: string) =>
            (node.querySelector(sel) as HTMLImageElement)?.src || "";

          const photoNodes = node.querySelectorAll(
            ".review_thumb img.img_g, .list_photo img.img_g",
          );

          return {
            nickname: getText(".name_user"),
            profileImage: getImg(".thumb_profile img.img_g"),
            reviewDate: getText(".txt_date"),
            rating: getText(".info_grade .screen_out:nth-of-type(2)"),
            body: getText(".desc_review"),
            photos: Array.from(photoNodes).map(
              (img) => (img as HTMLImageElement).src,
            ),
          };
        }),
    );

    return reviews;
  } catch (error) {
    console.error("Kakao Crawler: Error during crawl", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
