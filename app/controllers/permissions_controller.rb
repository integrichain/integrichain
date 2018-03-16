class PermissionsController < ApplicationController
  def new
    @users = User.all
    @documents = Document.all
    render :new
  end
    
  def create
    @permission = Permission.create(permission_params)
    puts permission_params 
    if @permission.persisted?
      redirect_to @permission
    else
      @errors += @permission.errors.full_messages
      @users = User.all
      @documents = Document.all
      render :new
    end
  end

  private

  def permission_params
    params[:permission]
      .permit(:user_id, :document_id)
  end
end
