import { format, formatDistance, formatDuration, getTime, getUnixTime } from 'date-fns'
import { LANGUAGE_DATE_FNS_MAP } from '@/config/locale'

/**
 * 获取秒级别时间戳。如果入参是毫秒级时间戳，去除最后三位
 * @param date 如果是number,表示毫秒级时间戳； 如果是Date对象，返回秒级时间戳。
 */
export const getTimestamp = (date: number | Date = new Date()): number => getUnixTime(date)

/**
 * 返回毫秒级时间戳。
 * 如果传入的数据是秒级时间戳，则乘1000。
 * 主要场景：如果后端返回的是秒级时间戳，乘以1000之后转换成日期展示。
 * @param date
 */
export const getMilliTimestamp = (date?: number | Date): number => {
  if (!date) {
    return getTime(new Date())
  }
  else {
    if (date instanceof Date) {
      return getTime(date)
    }
    else {
      if (date.toString().length === 10)
        return getTime(date * 1000)

      else
        return date
    }
  }
}

/**
 * 返回格式化后的字符串，这里的formatStr默认返回的是： 2022-12-16 13：21格式
 * @param date Date对象或者number，number可以为秒级时间戳也可以为毫秒级时间戳
 * @param formatStr 格式化字符串
 */
export const formatDate = (date: number | Date, formatStr = 'yyyy-MM-dd HH:mm') => {
  if (typeof date === 'number' && date.toString().length === 10)
    return format(date * 1000, formatStr)
  else
    return format(date, formatStr)
}

/**
 * 格式化日期range对象，返回格式化后的字符串，默认是: 2022/12/16 - 2022/12/19
 * @param startDate
 * @param endDate
 * @param formatStr
 * @param joinStr
 */
export const formatDateRange = (
  startDate: number | Date,
  endDate: number | Date,
  formatStr = 'yyyy/MM/dd',
  joinStr = '-',
) => `${formatDate(startDate, formatStr || 'yyyy/MM/dd')} ${joinStr} ${formatDate(endDate, formatStr || 'yyyy/MM/dd')}`

/**
 * @desc 获取指定时间距离当前时间或者指定时间多远；
 * @param date - Date | Number
 * @param baseDate - Date | Number，默认为当前时间
 * @param options - 扩展项，可以配置语言，有两种方式：传入语言类型lang；或者直接传入Locale；
 * @returns 返回描述“指定时间距离当前时间或者指定时间多远”的字符串，有多语言处理
 * @example
 * ```
 * formatDateDistance(1658320372161, 1658717927699, { lang: 'zh-CN' }) // 5 天前
 * formatDateDistance(1658320372161, 1658717927699, { lang: 'zh-CN', addSuffix: 'false' }) // 5 天
 * formatDateDistance(1658320372, 1658717927) // 5 days ago'
 * formatDateDistance(new Date('2022-07-12'), new Date('2022-07-17')) // 5 days ago
 * formatDateDistance(new Date('2022-07-05'), new Date('2022-07-12')) // 7 days ago
 * formatDateDistance(new Date('2022-06-12'), new Date('2022-07-12')) // about 1 month ago
 * formatDateDistance(new Date('2021-07-12'), new Date('2022-07-12')) // about 1 year ago
 * formatDateDistance(1658320372, 1658717927, { locale: ko }) // 5일 전
 * ```
 */

interface DistanceOptionType {
  locale?: Locale
  addSuffix?: boolean
  lang?: keyof typeof LANGUAGE_DATE_FNS_MAP
}

export const formatDateDistance = (
  date: Date | number = 0,
  baseDate: Date | number = new Date(),
  options?: DistanceOptionType,
): string => {
  const initOptions = {
    addSuffix: options?.addSuffix || true,
    locale: options?.locale || LANGUAGE_DATE_FNS_MAP[options?.lang || 'en'],
    ...options,
  }
  if (
    (typeof date === 'number' && date.toString().length === 10)
    || (typeof baseDate === 'number' && baseDate.toString().length === 10)
  )
    return formatDistance(getMilliTimestamp(date), getMilliTimestamp(baseDate), initOptions)

  return formatDistance(date, baseDate, initOptions)
}

interface DurationOptionType {
  locale?: Locale
  zero?: boolean
  delimiter?: string
  format?: Array<string>
  lang?: keyof typeof LANGUAGE_DATE_FNS_MAP
}

/**
 * @desc 将指定秒转为‘H小时M分钟S秒’，H、M、S为0时，默认不展示；如果想更改格式可传入第二个扩展参数options
 * @param second - Number，多少秒
 * @param options - 扩展项，可以配置语言，有两种方式：传入语言类型lang；或者直接传入Locale；
 * @returns 返回描述“H小时M分钟S秒”的字符串，有多语言处理
 * @example
 * ```
 * formatDateDuration(71) // 1minute11seconds
 * formatDateDuration(71, { lang: 'zh-CN' }) // 1分钟11秒
 * formatDateDuration(3604, { lang: 'zh-CN' }) // 1小时4秒
 * formatDateDuration(80221, { lang: 'zh-CN' }) // 22小时17分钟1秒
 * formatDateDuration(80221, { locale: ko }) // 22시간17분1초
 * formatDateDuration(80221, { lang: 'zh-CN', delimiter: ',' }) // 22小时,17分钟,1秒
 * formatDateDuration(80221, { lang: 'zh-CN', format: ['hours', 'minutes'] }) // 22小时17分钟
 * formatDateDuration(80220, { lang: 'zh-CN' }) // 22小时17分钟
 * formatDateDuration(80220, { lang: 'zh-CN', zero: true }) // 22小时17分钟0秒
 * formatDateDuration(880220, { lang: 'zh-CN' }) // 244小时30分钟20秒
 * ```
 */
export const formatDateDuration = (second: number, options?: DurationOptionType) => {
  const hours = Math.floor(second / 3600)
  const minutes = Math.floor((second % 3600) / 60)
  const seconds = Math.floor(second % 60)

  return formatDuration(
    {
      hours,
      minutes,
      seconds,
    },
    {
      zero: options?.zero || false,
      locale: options?.locale || LANGUAGE_DATE_FNS_MAP[options?.lang || 'en'],
      ...options,
    },
  ).replace(/ /g, '')
}
