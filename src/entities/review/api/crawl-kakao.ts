import { chromium } from "playwright";
import { KakaoPlaceData, KakaoReview } from "../model/types";

export async function fetchKakao(id: string): Promise<KakaoPlaceData> {
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

    await page.waitForSelector(".top_basic", { timeout: 10000 });

    const placeInfo = await page.evaluate(() => {
      const getText = (selector: string) =>
        document.querySelector(selector)?.textContent?.trim() || "";
      const getImg = (selector: string) =>
        (document.querySelector(selector) as HTMLImageElement)?.src || "";
      const getHref = (selector: string) =>
        (document.querySelector(selector) as HTMLAnchorElement)?.href || "";

      return {
        name: getText(".tit_place"),
        mainImage: getImg(".link_photo img"),
        rating: getText(".num_star"),
        openState: getText(".info_state"),
        openUntil: getText(".info_runtime"),
        reviewCount: getText(".link_review .info_num"),
        address: getText(".unit_default .txt_detail"),
        phone: getText(".info_suggest .txt_detail"),
        homepage: getHref(".info_suggest .link_detail"),
      };
    });

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

    return { reviews, placeInfo };
  } catch (error) {
    console.error("Kakao Crawler: Error during crawl", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
