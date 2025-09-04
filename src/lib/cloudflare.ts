// import { Project, ProjectStep, Category, User, UserProgress } from '@/types';

interface CloudflareResponse<T = unknown> {
  result: T[];
  success: boolean;
  errors: unknown[];
}

export class CloudflareClient {
  private apiToken: string;
  private accountId: string; 
  private databaseId: string;

  constructor() {
    this.apiToken = process.env.CLOUDFLARE_API_TOKEN!;
    this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
    this.databaseId = process.env.CLOUDFLARE_DATABASE_ID!;
  }

  async query(sql: string, params: unknown[] = []) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/d1/database/${this.databaseId}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql, params }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudflare API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json() as CloudflareResponse;
    return data.result?.[0]?.results || [];
  }

  // Categories
  async getCategories() {
    return this.query('SELECT * FROM categories ORDER BY sort_order');
  }

  // Projects  
  async getProjects(options: {
    categoryId?: string;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    let sql = 'SELECT p.*, c.name as category_name, c.icon as category_icon FROM projects p JOIN categories c ON p.category_id = c.id WHERE p.is_published = TRUE';
    const params: unknown[] = [];

    if (options.categoryId) {
      sql += ' AND p.category_id = ?';
      params.push(options.categoryId);
    }

    if (options.search) {
      sql += ' AND (p.title LIKE ? OR p.description LIKE ?)';
      params.push(`%${options.search}%`, `%${options.search}%`);
    }

    sql += ' ORDER BY p.created_at DESC';

    if (options.limit) {
      sql += ' LIMIT ?';
      params.push(options.limit);
      
      if (options.offset) {
        sql += ' OFFSET ?';
        params.push(options.offset);
      }
    }

    return this.query(sql, params);
  }

  async getProjectBySlug(slug: string) {
    const projects = await this.query(
      'SELECT p.*, c.name as category_name, c.icon as category_icon FROM projects p JOIN categories c ON p.category_id = c.id WHERE p.slug = ? AND p.is_published = TRUE',
      [slug]
    );
    return projects[0] || null;
  }

  async getProjectSteps(projectId: string) {
    return this.query(
      'SELECT * FROM project_steps WHERE project_id = ? ORDER BY step_number',
      [projectId]
    );
  }
}

export const cloudflare = new CloudflareClient();

