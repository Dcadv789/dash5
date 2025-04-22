import React from 'react';
import { useCategories } from './hooks/useCategories';
import { CategoryHeader } from './components/CategoryHeader';
import { CategoryList } from './components/CategoryList';
import { CopyModal } from './components/CopyModal';

export const Categories = () => {
  const {
    companies,
    selectedCompanyId,
    setSelectedCompanyId,
    categoryFilter,
    setCategoryFilter,
    loading,
    error,
    showCopyModal,
    setShowCopyModal,
    copyFromCompanyId,
    setCopyFromCompanyId,
    copyToCompanyId,
    setCopyToCompanyId,
    handleCopyCategories,
    categoryGroups,
    categories,
    handleCreateGroup,
    handleCreateCategory,
    handleEditGroup,
    handleToggleStatus,
    handleUpdateCategory,
    handleDeleteCategory,
    getCategoryStatus
  } = useCategories();

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="bg-zinc-900 rounded-xl p-8 text-center">
          <p className="text-zinc-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <CategoryHeader 
        showCopyModal={showCopyModal}
        setShowCopyModal={setShowCopyModal}
        selectedCompanyId={selectedCompanyId}
        setSelectedCompanyId={setSelectedCompanyId}
        companies={companies}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        error={error}
      />

      <CategoryList
        categoryGroups={categoryGroups}
        categories={categories}
        companies={companies}
        onCreateGroup={handleCreateGroup}
        onCreateCategory={handleCreateCategory}
        onEditGroup={handleEditGroup}
        onToggleStatus={handleToggleStatus}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        getCategoryStatus={getCategoryStatus}
      />

      <CopyModal
        isOpen={showCopyModal}
        onClose={() => setShowCopyModal(false)}
        companies={companies}
        copyFromCompanyId={copyFromCompanyId}
        copyToCompanyId={copyToCompanyId}
        onCopyFromChange={setCopyFromCompanyId}
        onCopyToChange={setCopyToCompanyId}
        onCopy={handleCopyCategories}
      />
    </div>
  );
};