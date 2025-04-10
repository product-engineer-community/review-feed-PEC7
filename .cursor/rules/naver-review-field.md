Naver Place Review Field Definitions

This document defines the structure and extractable fields for reviews found on the mobile version of Naver Place (m.place.naver.com). Each review is contained in a <li class="place_apply_pui EjjAW"> element.

Root Review URL naver
- URL: https://m.place.naver.com/restaurant/{id}/review/visitor?entry=ple&reviewSort=recent

Root Review Element
- Selector: li.place_apply_pui.EjjAW
- Description: Each review block is represented by this element.

Extractable Fields per Review

1. Nickname (masked user ID)
- Selector: span.pui__NMi-Dp
- Type: string
- Example: mon****
- Description: The nickname (masked) of the user who wrote the review.

2. Profile Image
- Selector: img.pui__AnL5iU
- Type: string (URL or base64)
- Example: https://...jpg or data:image/png;base64,...
- Description: The user’s profile picture.

3. Review Stats (Text counts)
- Selector: span.pui__WN-kAf
- Type: string[]
- Example: ["리뷰 23", "사진 29"]
- Description: The number of reviews and photos the user has posted.

4. Review Photos
- Selector: img.Poih_
- Type: string[]
- Example: ["https://pup-review-phinf.pstatic.net/..."]
- Description: List of photo URLs attached to the review.

5. Visit Keywords
- Selector: span.pui__V8F9nN
- Type: string[]
- Example: ["밤에 방문", "데이트", "예약 없이 이용"]
- Description: User-specified visit characteristics.

6. Emoji Tags
- Selector: div.pui__HLNvmI > span
- Type: string[]
- Example: ["술이 다양해요"]
- Description: Emoji-style highlight tags describing the experience.

7. Visit Date
- Selector: time[aria-hidden="true"]
- Type: string
- Example: 4.2.수
- Description: The date of visit, shown in short format.

8. Visit Verification Type
- Selector: div.pui__QKE5Pr > span
- Type: string[]
- Example: ["1번째 방문", "영수증"]
- Description: Indicates how the visit was verified (e.g., receipt).

9. Expandable Text / More Button (Review Body)
- Selector: a[data-pui-click-code="rvshowmore"]
- Type: element
- Description: Button to expand hidden review text (when truncated).

10. Additional Keyword Count
- Selector: a[data-pui-click-code="keywordmore"]
- Type: string
- Example: +1개의 리뷰가 더 있습니다
- Description: Shows if there are more tags hidden in the review.

Notes
- Some data (e.g., full review text) may only be available after user interaction (click or scroll).
- Class names (e.g., pui__NMi-Dp) may change dynamically or be obfuscated.
- Dynamic content requires a headless browser (e.g., Playwright, Puppeteer) to extract fully.
