class Ability
  include CanCan::Ability

  def initialize(user)
    if user.present?
      docs = Permission.all.where(user_id: user.id)
      can :manage, Document, id: docs
  end
end
