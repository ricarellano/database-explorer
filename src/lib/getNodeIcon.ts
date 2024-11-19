export const getNodeIcon = (nodeClass: string, nodeType: string, customIcons?: { [key: string]: React.ReactNode }) => {
  if (customIcons && customIcons[`${nodeClass}-${nodeType}`]) {
    return customIcons[`${nodeClass}-${nodeType}`]
  }
  if (nodeClass === 'db') return '📁'
  switch (nodeType) {
    case 'model':
      return '⚙️'
    case 'view':
      return '👁'
    case 'agent':
      return '🤖'
    default:
      return '📄'
  }
}
