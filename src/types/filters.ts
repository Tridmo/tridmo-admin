export type order = 'asc' | 'desc';
export type interiorsOrderBy = 'name' | 'views' | 'likes' | 'tags_count' | 'created_at' | 'status';
export type modelOrderBy = 'name' | 'downloads_count' | 'furniture_cost' | 'brand_id';
export type usersOrderBy = 'full_name' | 'downloads_count' | 'designs_count' | 'tags_count' | 'created_at';
export type brandOrderBy = 'name' | 'models_count';

export const modelsLimit = 30;
export const brandsLimit = 30;
export const designersLimit = 30;
export const interiorsLimit = 30;
export const projectsLimit = 6;
export const myInteriorsLimit = 12;
export const savedModelsLimit = 12;
export const brandModelsLimit = 30;
export const notificationsLimit = 16;
export const modelDownloadersLimit = 20;