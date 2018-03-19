class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'

  # config/environments/{development,test}.rb                                       
  config.action_mailer.default_url_options = { host: 'localhost:3000' }
end
