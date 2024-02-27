package com.PISBP.dao;

import com.PISBP.entity.User;

public class UserData {
    public String username;
    public Integer id;
    public String role;
    public UserData(User user){
        this.username = user.getUserName();
        this.id= user.getId();
        this.role=user.getRoles().split(" ")[0];
    }
}
