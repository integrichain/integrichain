class UsersController < Clearance::UsersController
  def show
    @user = User.find(params[:id])
    @documents = @user.documents.distinct
    render :show
  end

  def new
    render :new
  end
end
