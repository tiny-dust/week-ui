import { useBreakpoint, useMemo } from 'vooks'
import { provide, inject, reactive, toRef, watchEffect } from 'vue'

export function useIsMobile () {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 'xs'
  })
}

export function useIsTablet () {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 's'
  })
}

export function useIsSmallDesktop () {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 'm'
  })
}

export const i18n = (message) => {
  const localeReactive = inject('i18n', null)

  return {
    locale: toRef(localeReactive, 'locale'),
    t (key) {
      const { locale } = localeReactive
      return message[locale][key]
    }
  }
}

i18n.provide = function (localeRef) {
  const localeReactive = reactive({})
  watchEffect(() => {
    // 获取浏览器语言
    const browserLang = navigator.language
    localeReactive.locale = localeRef.value ?? browserLang
  })
  provide('i18n', localeReactive)
}
