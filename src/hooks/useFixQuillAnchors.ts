// hooks/useFixQuillAnchors.ts
import { useEffect } from 'react'

export function useFixQuillAnchors() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const selector = '.ql-tooltip a.ql-action, .ql-tooltip a.ql-remove'

    const patch = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLAnchorElement>(selector).forEach((a) => {
        if (!a.getAttribute('href')) {
          a.setAttribute('href', '#') // làm link “hợp lệ”
          a.setAttribute('role', 'button') // đúng semantics
          a.setAttribute('tabindex', '0')
          a.addEventListener(
            'click',
            (e) => {
              // vẫn cho các handler của Quill chạy, nhưng không điều hướng
              e.preventDefault()
            },
            { passive: false }
          )
        }
      })
    }

    // patch ngay lần đầu
    patch()

    // theo dõi Quill tạo tooltip động để patch tiếp
    const obs = new MutationObserver(() => patch())
    obs.observe(document.body, { childList: true, subtree: true })

    return () => obs.disconnect()
  }, [])
}
