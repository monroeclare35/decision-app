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
    id: 'general',
    label: CATEGORY_LABELS.general,
    icon: CATEGORY_ICONS.general,
    description: '适用于各种日常决策',
    placeholder: '描述一下你正在纠结的事情...',
  },
  {
    id: 'financial',
    label: CATEGORY_LABELS.financial,
    icon: CATEGORY_ICONS.financial,
    description: '花钱、投资、储蓄相关',
    placeholder: '比如：该不该买这台相机？该定投还是抄底？',
  },
  {
    id: 'emotional',
    label: CATEGORY_LABELS.emotional,
    icon: CATEGORY_ICONS.emotional,
    description: '感情、关系、人际相关',
    placeholder: '比如：要不要主动联系她？该不该表白？',
  },
  {
    id: 'meal',
    label: CATEGORY_LABELS.meal,
    icon: CATEGORY_ICONS.meal,
    description: '吃什么、去哪吃、饮食理念',
    placeholder: '比如：今天吃火锅还是日料？要不要点奶茶？',
  },
  {
    id: 'outfit',
    label: CATEGORY_LABELS.outfit,
    icon: CATEGORY_ICONS.outfit,
    description: '穿搭、购物、风格相关',
    placeholder: '比如：这双鞋值得买吗？今天穿哪套？',
  },
]
