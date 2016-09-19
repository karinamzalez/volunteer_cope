class Issues < OpenStruct

  def self.service(user)
    @@service ||= GithubService.new(user)
  end

  def self.repo_issues(user)
    issues = service(user).repo_issues
    issues.map { |user| Issues.new(user) }
  end

end
