/**
 * GitHub API Fetcher with Smart Cache and Graceful Fallback
 * Automatically pulls Fahim's real repositories from GitHub.
 */

const CACHE_KEY = "fahim_github_repos_v1";
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes cache

export async function fetchGitHubRepos(username = "aizatfir") {
  if (!username) return [];

  // Check LocalStorage Cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL && Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (e) {
    // ignore local storage error
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
      headers: {
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const rawRepos = await response.json();
    
    // Filter non-forks or prioritize active repos
    const processedRepos = rawRepos
      .filter(repo => !repo.fork && !repo.archived)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || "Experimental software project & source repository.",
        language: repo.language || "TypeScript",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        githubUrl: repo.html_url,
        homepage: repo.homepage,
        topics: repo.topics || []
      }));

    // Cache results
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: processedRepos
      }));
    } catch (e) {
      // ignore
    }

    return processedRepos;
  } catch (error) {
    console.warn("Could not fetch real-time GitHub repos, using fallback/curated:", error);
    
    // Check if expired cache exists to use as fallback
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data } = JSON.parse(cached);
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}

    return [];
  }
}
