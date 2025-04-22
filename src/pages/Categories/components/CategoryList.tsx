import React from 'react';
import { CategorySection } from './CategorySection';
import { CategoryGroup, Category } from '../../../types/financial';
import { Company } from '../../../types/company';

interface CategoryListProps {
  categoryGroups: CategoryGroup[];
  categories: Category[];
  companies: Company[];
  onCreateGroup: (type: 'revenue' | 'expense') => void;
  onCreateCategory: (type: 'revenue' | 'expense', groupId?: string) => void;
  onEditGroup: (groupId: string, newName: string) => void;
  onToggleStatus: (categoryId: string, companyId: string) => void;
  onUpdateCategory: (categoryId: string, name: string, groupId: string | null) => void;
  onDeleteCategory: (categoryId: string) => void;
  getCategoryStatus: (categoryId: string, companyId: string) => boolean;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categoryGroups,
  categories,
  companies,
  onCreateGroup,
  onCreateCategory,
  onEditGroup,
  onToggleStatus,
  onUpdateCategory,
  onDeleteCategory,
  getCategoryStatus
}) => {
  return (
    <div className="space-y-8">
      <CategorySection
        title="Receitas"
        type="revenue"
        groups={categoryGroups}
        categories={categories}
        companies={companies}
        onCreateGroup={onCreateGroup}
        onCreateCategory={onCreateCategory}
        onEditGroup={onEditGroup}
        onToggleStatus={onToggleStatus}
        onUpdateCategory={onUpdateCategory}
        onDeleteCategory={onDeleteCategory}
        getCategoryStatus={getCategoryStatus}
      />

      <CategorySection
        title="Despesas"
        type="expense"
        groups={categoryGroups}
        categories={categories}
        companies={companies}
        onCreateGroup={onCreateGroup}
        onCreateCategory={onCreateCategory}
        onEditGroup={onEditGroup}
        onToggleStatus={onToggleStatus}
        onUpdateCategory={onUpdateCategory}
        onDeleteCategory={onDeleteCategory}
        getCategoryStatus={getCategoryStatus}
      />
    </div>
  );
};