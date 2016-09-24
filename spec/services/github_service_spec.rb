require 'rails_helper'

describe GithubService do

  before(:each) do
    user = User.create(uid: 1, name: "Karina Munoz Gonzalez", username: "karinamzalez", oauth_token: ENV["TOKEN"], image: "apple", email: "karinamzalez@gmail.com", github: "https://github.com/karinamzalez")
    @service = GithubService.new(user)
  end

  context "#repo_issues" do
    it "returns a list of repository issues" do
      VCR.use_cassette("issues") do
        issues = @service.repo_issues

        expect(issues.count).to eq(2)
      end
    end
  end
end
