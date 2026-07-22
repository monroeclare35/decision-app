import type { Category } from '../types'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../types'

export interface CategoryConfig {
  id: Category
  label: string
  icon: string
  description: string
  placeholder: string
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'love',
    label: CATEGORY_LABELS.love,
    icon: CATEGORY_ICONS.love,
    description: '恋爱、暗恋、吵架、分手、婚姻',
    placeholder: '比如："异地半年了越来越累，不知道该坚持还是分开"',
  },
  {
    id: 'money',
    label: CATEGORY_LABELS.money,
    icon: CATEGORY_ICONS.money,
    description: '该不该买、怎么攒、怎么理',
    placeholder: '比如："手头有2万闲钱，想出去玩又想存起来，拿不定主意"',
  },
  {
    id: 'study_work',
    label: CATEGORY_LABELS.study_work,
    icon: CATEGORY_ICONS.study_work,
    description: '考研、选专业、跳槽、裸辞、职业方向',
    placeholder: '比如："想考研但家里催着工作，很焦虑，不知道该怎么办"',
  },
  {
    id: 'social',
    label: CATEGORY_LABELS.social,
    icon: CATEGORY_ICONS.social,
    description: '室友、同事、父母、朋友、借钱、社交',
    placeholder: '比如："同事老借钱不还，这次又开口了，不知道怎么拒绝"',
  },
  {
    id: 'daily',
    label: CATEGORY_LABELS.daily,
    icon: CATEGORY_ICONS.daily,
    description: '吃穿住行、时间安排、状态调整、各种琐事',
    placeholder: '比如："最近状态特别差，做什么都提不起劲，该怎么调整"',
  },
]
