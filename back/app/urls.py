from django.urls import path, re_path

from . import views

urlpatterns = [
    re_path(r'^users/?$', views.UserList.as_view(), name='users'),
    path('users/<int:id>/', views.UserDetail.as_view(), name='user_id'),
    path('users/delete/<int:id>/', views.UserDelete.as_view(), name='delete_user'),
    re_path(r'^(users/create)/?$', views.UserCreate.as_view(), name='create'),
    path('users/update/<int:id>/', views.UserUpdate.as_view(), name='update'),
    re_path(r'^(register)/?$', views.RegisterUser.as_view(), name="register"),
    re_path(r'^(api/token)/?$', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^(api/token/refresh)/$', views.MyTokenObtainPairView.as_view(), name='token_refresh'),
    re_path(r'scrapyapp/start/', views.start_crawler.as_view()),
   # path('result/<str:location>/<str:language>/<str:s>', views.Result.as_view()),
    path('allresults/', views.AllResults.as_view())
]
