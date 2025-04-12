import { chromium } from "playwright";
import { NaverReview } from "../model/types";

export async function fetchNaverReviews(id: string): Promise<NaverReview[]> {
  const url = `https://m.place.naver.com/restaurant/${id}/review/visitor?entry=ple&reviewSort=recent`;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });

    // ✅ UA + Viewport 설정은 context에서 설정
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
      viewport: { width: 390, height: 844 },
    });

    const page = await context.newPage();

    await page.goto(url, { waitUntil: "networkidle" });

    // ✅ 충분한 대기
    await page.waitForSelector('li[class*="place_apply_pui"]', {
      timeout: 30000,
    });

    const reviews: NaverReview[] = await page.$$eval(
      'li[class*="place_apply_pui"]',
      (nodes) =>
        nodes.map((node) => ({
          nickname:
            node.querySelector("span.pui__NMi-Dp")?.textContent?.trim() || "",
          profileImage:
            (node.querySelector("img.pui__AnL5iU") as HTMLImageElement)?.src ||
            "",
          stats: Array.from(node.querySelectorAll("span.pui__WN-kAf")).map(
            (el) => el.textContent?.trim() || "",
          ),
          photos: Array.from(node.querySelectorAll("img.Poih_")).map(
            (img) => (img as HTMLImageElement).src,
          ),
          visitKeywords: Array.from(
            node.querySelectorAll("span.pui__V8F9nN"),
          ).map((el) => el.textContent?.trim() || ""),
          emojiTags: Array.from(
            node.querySelectorAll("div.pui__HLNvmI > span"),
          ).map((el) => el.textContent?.trim() || ""),
          visitDate:
            node
              .querySelector('time[aria-hidden="true"]')
              ?.textContent?.trim() || "",
          verification: Array.from(
            node.querySelectorAll("div.pui__QKE5Pr > span"),
          ).map((el) => el.textContent?.trim() || ""),
          body:
            node
              .querySelector(
                'div.pui__vn15t2 a[data-pui-click-code="rvshowmore"]',
              )
              ?.textContent?.trim() || "",

          moreText: !!node.querySelector('a[data-pui-click-code="rvshowmore"]'),
          moreKeywords:
            node
              .querySelector('a[data-pui-click-code="keywordmore"]')
              ?.textContent?.trim() || "",
        })),
    );

    return reviews;
  } catch (error) {
    console.error("Naver Crawler: Error during crawl", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
